require "faker"
require "json"

# Write an array of `Idea`s to a path
def write_to_json(path : String | Path, ideas : Array(Idea))
  File.open(path, "w") do |file|
    file.puts(ideas.to_json)
  end
end

# Read an array of `Idea`s from a JSON file into an array of `Idea`s
def read_from_json(path : String | Path)
  file = File.read(path)
  Array(Idea).from_json(file)
end

# A class representing an idea that contains multiple `Block`
class Idea
  include JSON::Serializable
  @@current_id = 0

  getter id : Int32 | Nil
  getter contents : Array(Block)
  getter props : Hash(String, String) | Nil
  def initialize(@contents = [] of Block, @id = nil, @props = nil)
    if @id.nil?
      @@current_id += 1
      @id = @@current_id
    else
      @@current_id = @id.as(Int32)
    end
  end
  
  def mutate_prop(name : String, value : String)
    @props[name] = value
  end

  def add_block(block : Block)
    @contents << block
  end

  def add_block(*args, **others)
    @contents << Block.new(*args, **others)
  end

  def gen_paragraphs(paragraphs_length : Array(Int32))
    paragraphs_length.each { |length| add_block("p", length) }
  end

  alias BlockSetting =  {String, Int32}
  def gen_blocks(block_settings : Array(BlockSetting)| Int32)
    block_settings.each do |setting|
      if setting.is_a?(Int32)
        add_block("p", setting.as(Int32))
      elsif setting.is_a?(BlockSetting)
        tuple = setting.as(BlockSetting)
        add_block(tuple[0], tuple[1])
      end
    end
  end
end

# A struct representing a HTML element
struct Block
  include JSON::Serializable
  
  @type : String
  @content : String | Int32
  @attr : Hash(String, String) | Nil
  def initialize(@type, @content = 3, @attr = nil)
    @content = Faker::Lorem.paragraph(@content.as(Int32)) if @content.is_a?(Int32)
  end
end

def generator1(number : Int32)
  count = 0
  ideas = [] of Idea
  loop do
    break if count >= number
    idea = Idea.new()
    case Random.rand(4)
    when 0
      idea.add_block("h1", Faker::Lorem.sentence(Random.rand(4) + 1, true, 1))
      idea.gen_paragraphs([2, 3])
    when 1
      idea.add_block("h2", Faker::Lorem.sentence(Random.rand(3) + 4, true, 1))
      idea.gen_paragraphs([2, 3, 2])
    when 2
      idea.gen_paragraphs([4])
    when 3
      idea.gen_paragraphs([1, 1, 1, 1, 2])
    end
    ideas << idea
    count += 1
  end
  ideas.to_json
end